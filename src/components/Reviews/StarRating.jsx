import { FaStar } from "react-icons/fa";

const StarRating = ({ onChange, ratings }) => {
	return (
		<div className="flex space-x-2">
			{[...Array(5)].map((_, i) => {
				const value = i + 1;
				return (
					<FaStar
						key={value}
						size={24}
						onClick={() => onChange(value)}
						className={`cursor-pointer transition-colors duration-200 ${
							value <= ratings
								? "text-yellow-400"
								: "text-gray-200"
						} hover:text-yellow-400`}
					/>
				);
			})}
		</div>
	);
};

export default StarRating;
