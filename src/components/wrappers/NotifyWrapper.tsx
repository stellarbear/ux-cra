import React, { useState, createContext, useEffect } from "react";
import { Snackbar, Fade, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import * as serviceWorker from "serviceWorker";

const NotificationContext = createContext({
	message: "",
	updateMessage: (message: string) => { },
});

interface INotifyWrapperProps {
	timeout?: number;
}

const NotifyWrapper: React.FC<INotifyWrapperProps> = ({
	children,
	timeout = 4096
}): JSX.Element => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");

	const updateMessage = (message: string): void => {
		setMessage(message);
		setOpen(true);
	}

	const handleClose = (): void => {
		setOpen(false);
	};

	useEffect((): void => {
		if ("serviceWorker" in navigator) {
			serviceWorker.register({
				onSuccess: (registration: ServiceWorkerRegistration): void => updateMessage("PWA ready"),
				onUpdate: (registration: ServiceWorkerRegistration): void => updateMessage("PWA update"),
			});
		} else {
			/* eslint-disable-next-line no-console */
			console.log("Service worker not supported");
		}
	});

	const renderSnackBar = (): JSX.Element => {
		return (
			<Snackbar
				autoHideDuration={timeout}
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
				open={open}
				message={message}
				onClose={handleClose}
				TransitionComponent={Fade}
				action={(
					<IconButton
						key='close'
						aria-label='Close'
						color='inherit'
						onClick={handleClose}
					>
						<Close />
					</IconButton>
				)}
			/>
		);
	}

	return (
		<NotificationContext.Provider value={{ message, updateMessage }}>
			<React.Fragment>
				{children}
				{renderSnackBar()}
			</React.Fragment>
		</NotificationContext.Provider>
	);
}

export { NotifyWrapper, NotificationContext }
