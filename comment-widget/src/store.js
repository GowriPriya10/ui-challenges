import Comment from "./comment";

export default class CommentStore {

    constructor() {
        this.commentStore = [];
        this.initFromLocalStorage();
    }

    saveComment(content, parentId = 0) {
        const comment = new Comment(content, parentId);
        
        if(parentId) {
            const res = this.findCommentById(parentId)
            res && res.replies.push(comment);
        }else {
            this.commentStore.push(comment);
        }
        
        this.saveToLocalStorage();
        return comment;
    }

    getComments() {
        return JSON.parse(window.localStorage.commentStore);
    }

    findCommentById(id, comments = this.commentStore) {
        for(let comment of comments) {
           if(comment.id == id) {
                return comment;
            }
            if(comment.replies.length > 0) {
                const res = this.findCommentById(id, comment.replies);
                if(res) {
                    return res;
                }
            }
        }
        return undefined;
    }

    deleteCommentById(id) {
        
        const parent = this.findCommentById(id).parentId;

        if(parent) {
            const parentComment = this.findCommentById(parent);
            parentComment.replies.splice(parentComment.replies.findIndex(c => c.id == id), 1);
        }else {
            this.commentStore.splice(this.commentStore.findIndex((c) => c.id === id), 1);
        }

        this.saveToLocalStorage();
    }

    initFromLocalStorage() {
        if(window.localStorage.commentStore) {
            this.commentStore = JSON.parse(window.localStorage.commentStore);
        }
    }

    saveToLocalStorage() {
        window.localStorage.commentStore = JSON.stringify(this.commentStore);
    }
}
