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

  setDeletingState() {
    return this._commentComponent.setBtnDeletingState();
  }

  resetDeletingState() {
    return this._commentComponent.resetBtnDeletingState();
  }

  disableButton() {
    this._commentComponent.disableButton();
  }

  enableButton() {
    this._commentComponent.enableButton();
  }

  shakeDeletingComment() {
    this._commentComponent.shake();
  }

  _handleCommentDeleteClick(commentID) {
    this._deleteComment(UserAction.DELETE_COMMENT, UpdateType.PATCH, commentID);
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
