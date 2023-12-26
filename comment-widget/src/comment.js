export default class Comment {
    constructor(comment, parentId) {
        this.id = parseInt(Math.random() * 1000, 10);
        this.comment = comment;
        this.parentId = parentId;
        this.replies = [];
    }
}
