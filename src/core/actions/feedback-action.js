import { httpService, URLS } from "services";

const feedbackSuccess = (res) => {
	return {
		type: "SEND_FEEDBACK_FORM",
		payload: {
			...res
		}
	};
};

export function feedbackAction(params) {
	const body = JSON.stringify(params);
	const FAIL_ACTION = (res) => console.error(res);
	return httpService().handleStatusCodes({
		200: (res) => feedbackSuccess(res),
		400 : FAIL_ACTION,
		500: FAIL_ACTION,
	}).postRequest(URLS.feedback, body);
}
