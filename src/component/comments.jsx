import { useEffect } from "react";
import { useState } from "react";
import { getComments as getCommentsApi,
         createComment as createCommentApi,
         deleteComment as deleteCommentApi, 
         updateComment as updateCommentApi} from "../api";
import Comment from "./comment";
import CommentForm from "./commentForm";

const Comments = ({ currentId }) => {
    const [backendComment, setBackendComment] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const rootComments = backendComment.filter(comment => comment.parentId === null)

    console.log(rootComments);

    const getReplise = (commentId) => {
        return backendComment.filter((backendComment => backendComment.parentId === commentId))
            .sort((a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime())
    }

     const addComment = (text, parentId) => {
        console.log(text, parentId);
        createCommentApi(text,parentId).then((newComment)=>{
            setBackendComment([newComment,...backendComment])
        })
        setActiveComment(null)
    }

    const deleteComment = (commentId)=> {
        if(window.confirm('are sure')){
            deleteCommentApi(commentId).then(()=>{
                const updateBackendComments = backendComment.filter(comment=> comment.id !== commentId) 
                setBackendComment(updateBackendComments)
            })
        }
    }

    const updateComment = (text, comentId )=>{
        updateCommentApi(text,comentId).then(()=>{
            const updateBackendComments = backendComment.map((backendComment)=>{
                if(backendComment.id===comentId){
                    return {...backendComment, body: text};
                }
                return backendComment
            })

            setBackendComment(updateBackendComments)
            setActiveComment(null)
        })
    }


    useEffect(() => {
        getCommentsApi().then((data) => {
            setBackendComment(data)
        })
    }, [])
    return (
        <>
            <div className="comments">
                <h3 className="comments-title"> comments</h3>
                <div className="comment-form-title">Write comment</div>
                <CommentForm submitLabel="write" handleSubmit={addComment} />

                <div className="comments-container">
                    {rootComments.map(comment => (
                        <Comment
                            key={comment.id}
                            rootComment={comment}
                            replies={getReplise(comment.id)}
                            currentId={currentId}
                            deleteComment={deleteComment}
                            activeComment={activeComment}
                            setActiveComment={setActiveComment}
                            addComment={addComment}
                            updateComment={updateComment}
                        />
                    ))}

                </div>
            </div>
        </>);
}

export default Comments;