import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { SubmitButton } from './submit-button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export default function Login({ searchParams }: { searchParams: { message: string } }) {
	const signIn = async (formData: FormData) => {
		'use server'

		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const supabase = createClient()

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		if (error) {
			return redirect('/login?message=Could not authenticate user')
		}

		return redirect('/')
	}

	const signUp = async (formData: FormData) => {
		'use server'

		const origin = headers().get('origin')
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const supabase = createClient()

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${origin}/auth/callback`,
			},
		})

		if (error) {
			return redirect('/login?message=Could not authenticate user')
		}

		return redirect('/login?message=Check email to continue sign in process')
	}

	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Sign in to your account</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				{searchParams?.message && (
					<Alert variant="destructive" className="mb-5">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Login Failed</AlertTitle>
						<AlertDescription>{searchParams.message}</AlertDescription>
					</Alert>
				)}
				<form className="space-y-6">
					<div className="space-y-1">
						<Label htmlFor="email">Email address</Label>
						<Input name="email" id="email" placeholder="test@example.com" defaultValue="test@example.com" />
					</div>

					<div className="space-y-1">
						<Label htmlFor="password">Password</Label>
						<Input type="password" name="password" id="password" placeholder="••••••••" defaultValue="example@test" />
					</div>

					<div>
						<SubmitButton formAction={signIn} className="w-full">
							Sign In
						</SubmitButton>
					</div>
				</form>

				{/* <p className="mt-10 text-center text-sm text-gray-500">
					Not a member?{' '}
					<a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
						Sign up here
					</a>
				</p> */}
			</div>
		</div>
	)
}
