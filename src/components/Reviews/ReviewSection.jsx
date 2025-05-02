import { useParams } from "react-router";
import ReviewForm from "./ReviewForm";
import authApiClient from "../services/auth_api_client";
import { useEffect, useState } from "react";
import apiClient from "../services/api_client";
import useAuthContext from "../../hooks/useAuthContext";
import ReviewList from "./ReviewList";

const ReviewSection = () => {
	const { productId } = useParams();
	const [userCanReview, setUserCanReview] = useState(false);
	const [reviews, setReviews] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [editReview, setEditReview] = useState({ ratings: 0, comment: "" });
	const [editingId, setEditingId] = useState(null);
	const { user } = useAuthContext();

	const fetchReview = async () => {
		setIsLoading(true);
		try {
			const response = await apiClient.get(
				`/products/${productId}/reviews/`
			);

			// status: 200
			setReviews(response.data);
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	// submitting the review to database
	const onSubmit = async (data) => {
		try {
			await authApiClient.post(`/products/${productId}/reviews/`, data);
			// status: 201
			fetchReview();
		} catch (err) {
			console.log(err);
		}
	};

	// to prevent giving review to unpurchased product
	const checkUserPermissoin = async () => {
		try {
			const response = await authApiClient.get(
				`/orders/has-ordered/${productId}/`
			);

			setUserCanReview(response.data.hasOrdered);
		} catch (err) {
			console.log(err);
		}
	};

	// updating the review
	const handleUpdateReview = async (reviewId) => {
		try {
			const response = await authApiClient.put(
				`/products/${productId}/reviews/${reviewId}/`,
				editReview
			);
			setEditingId(null);
			fetchReview();
			// STATUS: 200
		} catch (err) {
			console.log(err);
		}
	};

	// deleting the review:
	const handleDeleteReview = async (reviewId) => {
		try {
			const response = await authApiClient.delete(
				`/products/${productId}/reviews/${reviewId}/`
			);
			fetchReview();

			// status: 204
		} catch (err) {
			console.log(err);
		}
	};

	//
	useEffect(() => {
		checkUserPermissoin();
		fetchReview();
	}, []);

	return (
		<div className="space-y-8 mt-10 max-w-5xl mx-auto px-4">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Customer Reviews</h2>
				<div className="badge badge-lg">
					{reviews.length}{" "}
					{reviews.length === 1 ? "Review" : "Reviews"}
				</div>
			</div>

			{userCanReview && (
				<div className="card bg-base-100 shadow-lg border border-base-200 rounded-xl overflow-hidden">
					<div className="card-body">
						<h3 className="card-title text-lg">Write a Review</h3>
						<ReviewForm onSubmit={onSubmit} />
					</div>
				</div>
			)}

			<div className="divider"></div>

			{isLoading ? (
				<div className="flex justify-center py-8">
					<span className="loading loading-spinner loading-lg text-primary"></span>
				</div>
			) : reviews.length === 0 ? (
				<div className="text-center py-8">
					<div className="text-5xl mb-4">📝</div>
					<h3 className="text-xl font-semibold mb-2">
						No Reviews Yet
					</h3>
					<p className="text-base-content/70">
						Be the first to review this product!
					</p>
				</div>
			) : (
				<ReviewList
					reviews={reviews}
					user={user}
					editReview={editReview}
					setEditReview={setEditReview}
					editingId={editingId}
					setEditingId={setEditingId}
					handleUpdateReview={handleUpdateReview}
					handleDeleteReview={handleDeleteReview}
				/>
			)}
		</div>
	);
};

export default ReviewSection;

/*
Review tree: ProductDetail --> ReviewSection --> ReviewForm, ReviewList --> ReviewCard --> EditReviewForm
*/
