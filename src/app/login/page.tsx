import { Alert, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/server'
import { AlertCircle, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SubmitButton } from './submit-button'

export default function Login({ searchParams }: { searchParams: { message: string; type: string } }) {
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
			return redirect('/login?message=Login failed. Please check your email and password and try again.&type=error')
		}

		return redirect('/')
	}

	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Login to your account</h2>
				<p className="text-center text-muted-foreground mt-1">Enter your details below to continue</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
				{searchParams?.message && (
					<Alert variant={searchParams?.type === 'error' ? 'destructive' : 'default'} className="mb-5">
						{searchParams?.type === 'error' ? <AlertTriangle className="h-4 w-4 mt-0.5" /> : <AlertCircle className="h-4 w-4 mt-0.5" />}
						<AlertTitle className="mb-0 leading-snug">{searchParams.message}</AlertTitle>
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
							Login
						</SubmitButton>
					</div>
				</form>

				<p className="mt-10 text-center text-sm text-muted-foreground">
					{`Don't have an account? `}
					<Link href="/signup" className="font-semibold leading-6 text-primary">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	)
}
