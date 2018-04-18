import React, { Component } from 'react';
import Modal from 'react-modal';
import Loading from 'react-loading';

class FormModal extends Component {
  state = {
    modalOpen: false,
    savingComment: false,
    formBody: '',
    formAuthor: '',
    formPristine: true
  }

  handleModalOpen = () => {
    const {comment} = this.props;
    this.setState(() => ({
      modalOpen: true,
      formAuthor: comment !== undefined ? comment.author : '',
      formBody: comment !== undefined ? comment.body : ''
    }));
  }

  handleModalClose = () => {
    this.setState(() => ({
      modalOpen: false,
      formAuthor: '',
      formBody: ''
    }));
  }

  handleChange = (newState) => {
    this.setState(newState);
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  handleSubmitComment = (e) => {
    e.preventDefault();
    this.setState(() => ({ savingComment: true }))
    this.props.onModalSubmit({formAuthor: this.state.formAuthor, formBody: this.state.formBody});
  }

  render() {
    const {modalOpen, savingComment} = this.state;
    const {isEditMode, title} = this.props;

    return (
      <div className='create-comment-wrapper'>
        {isEditMode
        ? <a
            href='javascript:void(0)'
            onClick={()=>this.handleModalOpen()}>
            edit
          </a>
        : <button
            onClick={()=>this.handleModalOpen()}
            className='leave-comment'>
            Leave a comment!
          </button>}
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={modalOpen}
          onRequestClose={()=>this.handleModalClose()}
          contentLabel='Modal'
        >
          <div>
            {savingComment === true
              ? <Loading delay={200} type='spin' color='#222' className='loading' />
              : <form onSubmit={this.handleSubmitComment}>
                <h3 className='sub-header'>
                  {title}
                </h3>
                <div className='comment-form'>
                  {!isEditMode
                    ?<input
                      className='comment-author-input'
                      type='text'
                      placeholder='Author'
                      value={this.state.formAuthor}
                      onChange={(event)=>this.handleChange({formAuthor: event.target.value})}
                    />:''}
                  <textarea
                    rows="4"
                    cols="30"
                    className='comment-body-input'
                    placeholder='Insert your comment here'
                    value={this.state.formBody}
                    onChange={(event)=>this.handleChange({formBody: event.target.value})}
                  />
                  <button type="submit" disabled={false || savingComment}>{/*TODO: disable submit if form is empty*/}
                    Submit
                  </button>
                </div>
              </form>}
          </div>
        </Modal>
      </div>
    )
  }

}
export default FormModal;