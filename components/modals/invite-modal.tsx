'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FileUpload } from '@/components/file-upload';
import { useModal } from '@/hooks/use-modal-store';
import { Label } from '../ui/label';
import { Check, Copy, RefreshCcw } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';
import { useState } from 'react';

export const InviteModal = () => {
	const { isOpen, onClose, type, data, onOpen } = useModal();
	const [copied, setCopied] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const origin = useOrigin();

	const isModalOpen = isOpen && type === 'invite';

	const handleClose = () => {
		onClose();
	};
	const { server } = data;
	const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

	const onCopy = () => {
		if (copied) {
			return;
		}
		navigator.clipboard.writeText(inviteUrl);
		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	const onNew = async () => {
		try {
			setIsLoading(true);
			const response = await axios.patch(
				`/api/servers/${server?.id}/invite-code`,
			);
			onOpen('invite', { server: response.data });
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className="bg-white text-black p-0 overflow-hidden">
				<DialogHeader className="py-8 py-6">
					<DialogTitle className="text-2xl text-center font-bold">
						Invite Friends
					</DialogTitle>
				</DialogHeader>
				<div className="p-6">
					<Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
						Server invite link
					</Label>
					<div className="flex items-center mt-2 gap-x-2">
						<Input
							disabled={isLoading}
							className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
							value={inviteUrl}
						/>
						<Button size="icon" onClick={onCopy}>
							{copied ? (
								<Check className="w-4 h-4 text-green-500" />
							) : (
								<Copy className="w-4 h-4"></Copy>
							)}
						</Button>
					</div>
					<Button
						disabled={isLoading}
                        onClick={onNew}
						variant="link"
						size="sm"
						className="text-xs text-zinc-500 px-0">
						Generate a new link
						<RefreshCcw className="w-4 h-4 ml-2" />
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
