import { NextResponse } from 'next/server'

export async function POST() {
	return NextResponse.json(
		{ success: true },
		{
			status: 200,
			headers: {
				'Set-cookie': 'session=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict;',
			},
		}
	)
}
