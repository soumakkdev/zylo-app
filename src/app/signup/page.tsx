import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SubmitButton } from '../login/submit-button'

export default function Login({ searchParams }: { searchParams: { message: string } }) {
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
			return redirect('/login?message=Could not authenticate user&type=error')
		}

		return redirect('/login?message=Check email to continue sign in process')
	}

	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Create a new account</h2>
				<p className="text-center text-muted-foreground mt-1">Sign up in just a few easy steps</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6">
					<div className="space-y-1">
						<Label htmlFor="email">Email address</Label>
						<Input name="email" id="email" placeholder="test@example.com" />
					</div>

					<div className="space-y-1">
						<Label htmlFor="password">Password</Label>
						<Input type="password" name="password" id="password" placeholder="••••••••" />
					</div>

					<div>
						<SubmitButton formAction={signUp} className="w-full">
							Sign Up
						</SubmitButton>
					</div>
				</form>

				<p className="mt-10 text-center text-sm text-muted-foreground">
					{'Already have an account? '}
					<Link href="/login" className="font-semibold leading-6 text-primary">
						Login
					</Link>
				</p>
			</div>
		</div>
	)
}
