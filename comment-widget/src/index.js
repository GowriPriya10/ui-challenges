import './styles/style.scss';
import CommentStore from "./store";

const store = new CommentStore();
const comments = store.commentStore;

const commentsWrapper = document.querySelector('#comments-wrapper');

const loadAllComments = (comments, parent = commentsWrapper) => {
    comments.forEach((comment) => {
        const node = createComment(comment);

        if(comment.replies.length > 0) {
            loadAllComments(comment.replies, node.querySelector('.replies'));
        }

        parent.appendChild(node);
    })
}

const createComment = (comment) => {
    const commentNode = document.querySelector('#comment').content.cloneNode(true);
    commentNode.querySelector('.comment').id = comment.id;
    commentNode.querySelector('.comment .content').textContent = comment.comment;
    commentNode.querySelector('.comment .reply-input-wrapper').id = `reply-input-${comment.id}`;

    return commentNode;
}

loadAllComments(comments);

function renderComment(comment, parentNodeId = 0) {
    const node = createComment(comment);

    if(parentNodeId) {
        document.getElementById(parentNodeId).querySelector('.replies').appendChild(node);
    }else {
        commentsWrapper.appendChild(node);
    }
}

document.addEventListener('keypress', e => {
    if(e.target.id === 'comment-input' && e.key === 'Enter') {
        const content = e.target.value;
        const id = e.target.classList.contains('reply-input') ? e.target.parentNode.parentNode.id : 0;
        const comment = store.saveComment(content, id);
        renderComment(comment, id);
        e.target.value = '';
    }
})

document.addEventListener('click', e => {
    if(e.target.classList.contains('reply-btn')) {
        replyCommentListener(e);
    }

    if(e.target.classList.contains('delete-btn')) {
        deleteCommentListener(e);
    }
})

function replyCommentListener(e) {
    const target = e.target.parentNode.parentNode.querySelector(`#reply-input-${e.target.parentNode.parentNode.id}`);
    target.classList.toggle('show-input-wrapper');
}

function deleteCommentListener(e) {
    const targetId = e.target.parentNode.parentNode.id;
    store.deleteCommentById(targetId);
    e.target.parentNode.parentNode.remove();
}
