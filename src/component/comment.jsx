import CommentForm from "./commentForm";

const Comment = ({
    rootComment,
    replies,
    currentId,
    deleteComment,
    activeComment,
    setActiveComment,
    parentId = null,
    addComment,
    updateComment }) => {

    const fiveminutes = 300000;
    const timePassed = new Date() - new Date(rootComment.createdAt) > fiveminutes;
    const canReply = Boolean(currentId);
    const canEdit = currentId === rootComment.userId && !timePassed;
    const canDelete = currentId === rootComment.userId && !timePassed;
    const createdAt = new Date(rootComment.createdAt).toLocaleDateString()
    const isRepling = activeComment && activeComment.type === "replying" && activeComment.id === rootComment.id;
    const isEditing = activeComment && activeComment.type === "editing" && activeComment.id === rootComment.id;
    const replyId = parentId ? parentId : rootComment.id;


    return (
        <>
            <div className="comment">
                <div className="commment-image-container">
                    <img alt="imgAvatar" src="https://raw.githubusercontent.com/monsterlessonsacademy/monsterlessonsacademy/144-react-comments/public/user-icon.png" />
                </div>
                <div className="comment-right-part">
                    <div className="comment-content">
                        <div className="comment-author" > {rootComment.username}</div>
                        <div>{createdAt}</div>
                    </div>

                    {!isEditing && <div className="comment-text"> {rootComment.body}</div>}
                    {isEditing && (
                        <CommentForm
                            submitLabel='update'
                            hasCancelButton
                            initialText={rootComment.body}
                            handleSubmit={(text) => updateComment(text, rootComment.id)}
                            handleCancel={() => setActiveComment(null)}
                        />
                    )}
                    <div className="comment-actions">
                        {canReply && <div className="comment-action" onClick={() => { setActiveComment({ id: rootComment.id, type: 'replying' }) }}>Reply</div>}
                        {canEdit && <div className="comment-action" onClick={() => { setActiveComment({ id: rootComment.id, type: 'editing' }) }}>Edit</div>}
                        {canDelete && <div className="comment-action" onClick={() => { deleteComment(rootComment.id) }}>Delete</div>}
                    </div>
                    {isRepling && <CommentForm
                        submitLabel='Reply'
                        handleSubmit={(text) => addComment(text, replyId)}
                    />}
                    {replies.length > 0 && (
                        <div className="replies">
                            {replies.map((reply) => (
                                <Comment
                                    rootComment={reply}
                                    key={reply.id}
                                    replies={[]}
                                    currentId={currentId}
                                    deleteComment={deleteComment}
                                    addComment={addComment}
                                    parentId={rootComment.id}
                                    updateComment={updateComment} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>);
}

export default Comment;