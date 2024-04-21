import { Icon } from "@chakra-ui/react";

export const TypingIndicator = (props) => (
	<Icon viewBox="0 0 200 200" {...props}>
		<circle
			fill="#4FD1C5"
			stroke="#4FD1C5"
			strokeWidth="15"
			r="15"
			cx="40"
			cy="100"
			data-darkreader-inline-stroke=""
			data-darkreader-inline-fill=""
		>
			<animate
				attributeName="opacity"
				calcMode="spline"
				dur="2"
				values="1;0;1;"
				keySplines=".5 0 .5 1;.5 0 .5 1"
				repeatCount="indefinite"
				begin="-.4"
			></animate>
		</circle>
		<circle
			fill="#4FD1C5"
			stroke="#4FD1C5"
			strokeWidth="15"
			r="15"
			cx="100"
			cy="100"
			data-darkreader-inline-stroke=""
			data-darkreader-inline-fill=""
		>
			<animate
				attributeName="opacity"
				calcMode="spline"
				dur="2"
				values="1;0;1;"
				keySplines=".5 0 .5 1;.5 0 .5 1"
				repeatCount="indefinite"
				begin="-.2"
			></animate>
		</circle>
		<circle
			fill="#4FD1C5"
			stroke="#4FD1C5"
			strokeWidth="15"
			r="15"
			cx="160"
			cy="100"
			data-darkreader-inline-stroke=""
			data-darkreader-inline-fill=""
		>
			<animate
				attributeName="opacity"
				calcMode="spline"
				dur="2"
				values="1;0;1;"
				keySplines=".5 0 .5 1;.5 0 .5 1"
				repeatCount="indefinite"
				begin="0"
			></animate>
		</circle>
	</Icon>
);
