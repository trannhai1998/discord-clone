import { redirect } from 'next/navigation';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import NavigationAction from './navigation-action';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NavigationItem } from './navigation-item';
import { ModeToggle } from '@/components/mode-toggle';
import { UserButton } from '@clerk/nextjs';

const NavigationSidebar = async () => {
	const profile = await currentProfile();
	if (!profile) {
		return redirect('/');
	}

	const servers = await db.server.findMany({
		where: {
			members: {
				some: {
					profileId: profile?.id,
				},
			},
		},
	});

	return (
		<div
			className="space-y-4 flex flex-col items-center
            py-4
        h-full text-primary w-full  bg-violet-400 dark:bg-[#1E1F22]
        ">
			<NavigationAction />
			<Separator className="h-[2px] bg-zinc-300  dark:bg-zinc-700 rounded-md w-10 mx-auto"></Separator>
			<ScrollArea className="flex-1 w-full">
				{servers.map((server) => (
					<div key={server.id} className="mb-4">
						<NavigationItem
							id={server?.id}
							imageUrl={server?.imageUrl}
							name={server?.name}
						/>
					</div>
				))}
			</ScrollArea>
			<div className=" mt-auto flex items-center flex-col gap-y-4">
				<ModeToggle></ModeToggle>
				<UserButton
					afterSignOutUrl="/"
					appearance={{
						elements: {
							avatarBox: 'h-[48px] w-[48px]',
						},
					}}></UserButton>
			</div>
		</div>
	);
};

export default NavigationSidebar;
