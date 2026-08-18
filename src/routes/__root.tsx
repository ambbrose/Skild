import { ClerkProvider, useUser } from "@clerk/tanstack-react-start";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { PostHogProvider, usePostHog } from "posthog-js/react";
import { useEffect, useRef } from "react";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import Crosshair from "#/components/Crosshair";
import Navbar from "../components/Navbar";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Skild | The Registry for Agentic AI Agents",
			},
			{
				name: "description",
				content:
					"Skild is a registry for agentic AI agents, where you can find, share, and discover AI agents.",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function PostHogIdentity() {
	const { isLoaded, isSignedIn, user } = useUser();
	const posthog = usePostHog();
	const identifiedUserId = useRef<string | null>(null);

	useEffect(() => {
		if (!isLoaded) {
			return;
		}

		if (!isSignedIn || !user) {
			if (identifiedUserId.current) {
				posthog.reset();
				identifiedUserId.current = null;
			}
			return;
		}

		if (identifiedUserId.current === user.id) {
			return;
		}

		if (identifiedUserId.current) {
			posthog.reset();
		}

		posthog.identify(user.id, {
			...(user.primaryEmailAddress?.emailAddress
				? { email: user.primaryEmailAddress.emailAddress }
				: {}),
			...(user.fullName ? { name: user.fullName } : {}),
		});
		identifiedUserId.current = user.id;
	}, [isLoaded, isSignedIn, posthog, user]);

	return null;
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const posthogApiKey = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;
	const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

	if (!posthogApiKey && import.meta.env.DEV) {
		throw new Error(
			"VITE_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_PUBLIC_POSTHOG_PROJECT_TOKEN is configured",
		);
	}

	if (!posthogHost && import.meta.env.DEV) {
		throw new Error(
			"VITE_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_PUBLIC_POSTHOG_HOST is configured",
		);
	}

	const app = (
		<ClerkProvider>
			{posthogApiKey && posthogHost ? <PostHogIdentity /> : null}
			<div id="root-layout">
				<header className="border-b">
					<div className="frame">
						<Navbar />
						<Crosshair />
						<Crosshair />
					</div>
				</header>

				<main>
					<div className="frame">{children}</div>
				</main>
			</div>

			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "Tanstack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
					TanStackQueryDevtools,
				]}
			/>
		</ClerkProvider>
	);

	return (
		<html lang="en" className="dark">
			<head>
				<HeadContent />
			</head>
			<body className="font-sans antialiased">
				{posthogApiKey && posthogHost ? (
					<PostHogProvider
						apiKey={posthogApiKey}
						options={{
							api_host: posthogHost,
							defaults: "2025-05-24",
							capture_exceptions: true,
							debug: import.meta.env.DEV,
						}}
					>
						{app}
					</PostHogProvider>
				) : (
					app
				)}
				<Scripts />
			</body>
		</html>
	);
}
