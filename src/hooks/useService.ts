import { useCallback, useEffect, useState } from "react";
import { ApiError } from "../helpers/api-error";

function useService<R>(
	service: () => Promise<R>,
	options: {
		autoStart?: boolean;
		onData: (data: R) => void;
		onError?: (error: ApiError) => void;
	},
): [boolean, () => void];
function useService<P>(
	service: (serviceParams: P) => Promise<void>,
	options: {
		params?: P;
		autoStart?: boolean;
		onError?: (error: ApiError) => void;
	},
): [boolean, (startParams: P) => void];
function useService<P, R>(
	service: (serviceParams: P) => Promise<R>,
	options: {
		params?: P;
		autoStart?: boolean;
		onData: (data: R) => void;
		onError?: (error: ApiError) => void;
	},
): [boolean, (startParams?: P) => void];
function useService<P, R>(
	service: (serviceParams?: P) => Promise<R | void>,
	{
		params,
		autoStart = false,
		onData,
		onError,
	}: {
		params?: P;
		autoStart?: boolean;
		onData?: (data: R | void) => void;
		onError?: (error: ApiError) => void;
	},
): [boolean, (startParams?: P) => void] {
	const [isFetching, setIsFetching] = useState(false);

	const start = useCallback<(p?: P) => Promise<void>>(
		async (p) => {
			setIsFetching(true);
			try {
				const result = await service(p);
				if (onData) {
					onData(result);
				}
			} catch (e) {
				if (onError) {
					onError(e as ApiError);
				}
			}
			setIsFetching(false);
		},
		[service, onData, onError],
	);

	useEffect(() => {
		if (autoStart) {
			start(params);
		}
	}, [service, params, autoStart, start]);

	return [isFetching, start];
}

export { useService };
