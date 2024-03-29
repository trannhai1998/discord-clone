import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="bg-red-300 h-full w-full flex items-center justify-center">
			{children}
		</div>
	);
};

export default AuthLayout;
