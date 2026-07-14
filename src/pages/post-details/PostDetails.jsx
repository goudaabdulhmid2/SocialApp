import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostServices from "../../services/PostServices";
import { showApiErrorToast } from "../../components/shared/ApiErrorDisplay/ApiErrorDisplay";
import CommentServices from "../../services/CommentServices";
import PostCard from "../../components/Posts/PostCard";
import { Spinner } from "@heroui/react";

export default function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState();

    const [comments, setComments] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        numberOfPages: 0,
    });

    const [loading, setLoading] = useState(false);

    async function getPost() {
        try {
            const { data } = await PostServices.getPost(id);
            setPost(data.post);
        } catch (err) {
            showApiErrorToast(err);
        }
    }

    async function getComments(page = 1, limit = 10) {
        try {
            setLoading(true);
            const data = await CommentServices.getComments(id, page, limit);

            setComments((prev) => page === 1 ? data.data.comments : [...prev, ...data.data.comments]);
            setPagination(data.meta.pagination);
        } catch (err) {
            showApiErrorToast(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                await Promise.all([
                    getPost(),
                    getComments(1)
                ]);
            } catch (error) {
                showApiErrorToast(error);
            }
        };

        fetchPostAndComments();
    }, [id]);

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-8 animate-appearance-in">
            {/* Post Section */}
            {post ? (
                <PostCard post={post} comments={comments} getComments={getComments} pagination={pagination} loading={loading} isDetails={true} />
            ) : (
                <div className="flex justify-center p-12">
                    <Spinner size="lg" color="primary" />
                </div>
            )}


        </div>
    );
}
