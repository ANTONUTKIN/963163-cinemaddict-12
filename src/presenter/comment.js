import CommentView from "../view/comment.js";
import {RenderPosition, remove, render} from "../utils/render.js";
import {UpdateType, UserAction} from "../const.js";

class Comment {
  constructor(commentsWrapper, deleteComment) {
    this._commentsWrapper = commentsWrapper;
    this._deleteComment = deleteComment;
    this._commentComponent = null;

    this._handleCommentDeleteClick = this._handleCommentDeleteClick.bind(this);
  }

  init(comment) {
    this._comment = comment;
    this._commentComponent = new CommentView(this._comment);
    this._commentComponent.setDeleteCommentClickHandler(this._handleCommentDeleteClick);
    render(
        this._commentsWrapper,
        this._commentComponent,
        RenderPosition.BEFOREEND
    );
  }

  // _renderComments() {
  //   render(
  //     this._commentsWrapper,
  //     this._commentsSection,
  //     RenderPosition.BEFOREEND
  //   );
  //   this._movie.comments.forEach(this.createCommnet);
  // }

  // createCommnet(comment) {
  //   const commentMessage = new CommentView(comment);
  //   render(this._commentsList, commentMessage, RenderPosition.BEFOREEND);
  //   commentMessage.setDeleteClickHandler(this._deleteCommentClickHandler);
  // }


  _handleCommentDeleteClick(comment) {
    this._deleteComment(UserAction.DELETE_COMMENT, UpdateType.PATCH, comment);
  }

  destroy() {
    remove(this._commentComponent);
  }

  _handleModelEvent(updateType, updatedMovie) {
    switch (updateType) {
      case UpdateType.MINOR:
        if (this._commentPresenter !== null) {
          this._commentPresenter.init(updatedMovie);
        }
        break;
    }
  }
}

export default Comment;
