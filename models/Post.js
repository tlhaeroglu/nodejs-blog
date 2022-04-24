class Post{
    constructor(id, title, content, author, createdAt){
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.createdAt = createdAt;
    }
}

module.exports = Post;