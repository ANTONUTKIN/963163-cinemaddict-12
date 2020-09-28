import CommentPresenter from "./comment.js";
import CommentsWrapperView from "../view/comments-wrapper";
import NewCommentView from '../view/new-comment';
import {render, RenderPosition} from "../utils/render.js";
import {UpdateType, UserAction} from "../const.js";

export default class CommentList {
  constructor(commentsContainer, film, commentsModel, changeData, api) {
    this._commentsContainer = commentsContainer;
    this._film = film;
    this._commentsModel = commentsModel;
    this._changeData = changeData;
    this._api = api;
    this._commentPresenter = {};

    this._handleCommentDeleteClick = this._handleCommentDeleteClick.bind(this);
    this._handleCommentSubmit = this._handleCommentSubmit.bind(this);
  }

  init() {
    this._renderCommentsWrapper();
    this._renderCommentsList();
    this._renderAddNewCommentForm();
  }

  _renderAddNewCommentForm() {
    this._newCommentComponent = new NewCommentView();
    render(this._commentsListWrapper, this._newCommentComponent, RenderPosition.BEFOREEND);
    this._newCommentComponent.setSubmitCommentHandler(this._handleCommentSubmit);
  }

  _renderCommentsWrapper() {
    const commentsWrapperComponent = new CommentsWrapperView(this._commentsModel.getComments());
    render(this._commentsContainer, commentsWrapperComponent, RenderPosition.BEFOREEND);
    this._commentsListWrapper = commentsWrapperComponent.getElement().querySelector(`.film-details__comments-list`);
  }

  _renderCommentsList() {
    const comments = this._commentsModel.getComments();
    comments.forEach((comment) => this._renderComment(comment));
  }

  _renderComment(comment) {
    const commentPresenter = new CommentPresenter(
        this._commentsListWrapper,
        this._handleCommentDeleteClick
    );
    commentPresenter.init(comment);
    this._commentPresenter[comment.id] = commentPresenter;
  }

  _disableAllDeleteButtons() {
    Object
        .values(this._commentPresenter)
        .forEach((presenter) => presenter.disableButton());
  }

  _enableAllDeleteButtons() {
    Object
        .values(this._commentPresenter)
        .forEach((presenter) => presenter.enableButton());
  }


  _handleCommentDeleteClick(userAction, updateType, commentID) {
    this._commentPresenter[commentID].setDeletingState();
    this._disableAllDeleteButtons();
    this._api.deleteComment(commentID).then(() => {
      this._commentsModel.deleteComment(updateType, commentID);
      this._changeData(
          userAction,
          updateType,
          Object.assign(
              {},
              this._film,
              {
                comments: this._film.comments.filter((id) => id !== commentID)
              }
          )
      );
    }).catch(() => {
      this._commentPresenter[commentID].shakeDeletingComment();
      this._commentPresenter[commentID].resetDeletingState();
      this._enableAllDeleteButtons();
    });

  }

  _handleCommentSubmit() {
    const newComment = this._newCommentComponent.getComment();
    if (newComment) {
      this._newCommentComponent.disableForm();
      this._api.addComment(this._film, newComment)
      .then((response) => {
        this._commentsModel.addComment(UpdateType.PATCH, response.comments);
        this._changeData(
            UserAction.ADD_COMMENT,
            UpdateType.PATCH,
            Object.assign(
                {},
                this._film,
                {
                  comments: response.movie.comments
                }
            )
        );
      }).catch(() => {
        this._newCommentComponent.shake();
        this._newCommentComponent.enableForm();
      });
    }
  }

  destroy() {
    Object.values(this._commentPresenter)
    .forEach((presenter) => presenter.destroy());
    this._commentPresenter = {};
  }

}
