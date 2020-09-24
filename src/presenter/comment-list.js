import CommentPresenter from "./comment.js";
import CommentsWrapperView from "../view/comments-wrapper";
import NewCommentView from '../view/new-comment';
import {render, RenderPosition} from "../utils/render.js";
import {UpdateType, UserAction} from "../const.js";

export default class CommentList {
  constructor(commentsContainer, film, commentsModel, changeData) {
    this._commentsContainer = commentsContainer;
    this._film = film;
    this._commentsModel = commentsModel;
    this._changeData = changeData;
    this._commentPresenter = {};

    this._handleCommentDeleteClick = this._handleCommentDeleteClick.bind(this);
    this._handleCommentSubmit = this._handleCommentSubmit.bind(this);
  }

  init() {
    this._commentsWrapperComponent = new CommentsWrapperView(this._commentsModel.getComments());
    render(
        this._commentsContainer,
        this._commentsWrapperComponent,
        RenderPosition.BEFOREEND
    );

    this._commentsListWrapper = this._commentsWrapperComponent.getElement().querySelector(`.film-details__comments-list`);

    this._renderCommentsList();


    this._newCommentComponent = new NewCommentView();
    render(this._commentsListWrapper, this._newCommentComponent, RenderPosition.BEFOREEND);
    this._newCommentComponent.setSubmitCommentHandler(this._handleCommentSubmit);

  }

  _handleCommentSubmit() {
    const newComment = this._newCommentComponent.getComment();
    this._commentsModel.addComment(UpdateType.PATCH, newComment);

    this._changeData(
        UserAction.ADD_COMMENT,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              comments: this._commentsModel.getComments()
            }
        )
    );
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

  _handleCommentDeleteClick(userAction, updateType, comment) {
    this._commentsModel.deleteComment(updateType, comment.id);
    // this._commentPresenter[comment.id].destroy();

    this._changeData(
        userAction,
        updateType,
        Object.assign(
            {},
            this._film,
            {
              comments: this._commentsModel.getComments()
            }
        )
    );
  }

  destroy() {
    Object.values(this._commentPresenter)
    .forEach((presenter) => presenter.destroy());

    this._commentPresenter = {};
  }

}
