import { useState } from "react";

const CommentForm = ({ handleSubmit, submitLabel, handleCancel, initialText = '', hasCancelButton = false,  }) => {
    const [text, setText] = useState(initialText);
    const isDisabled = text.length === 0;
    const onSubmit = e => {
        e.preventDefault()
        handleSubmit(text)
        setText('')
    }
    return (<>
        <form onSubmit={onSubmit}>
            <textarea className="text-form-textarea" value={text} onChange={(e) => { setText(e.target.value) }} />
            <button className="comment-form-button" disabled={isDisabled}>{submitLabel}</button>
            {hasCancelButton&&(
                <button type='button' className="comment-form-button comment-form-cancel-button" onClick={handleCancel}> Cancel</button>
            )}
        </form>
    </>);

}

export default CommentForm