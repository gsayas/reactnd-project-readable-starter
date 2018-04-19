import React, { Component } from 'react';
import Modal from 'react-modal';
import Loading from 'react-loading';

class PostModal extends Component {
  state = {
    modalOpen: false,
    isSavingForm: false,
    formBody: '',
    formAuthor: '',
    formTitle: '',
    formPristine: true
  }

  handleModalOpen = () => {
    const {post} = this.props;
    this.setState(() => ({
      modalOpen: true,
      formAuthor: post !== undefined ? post.author : '',
      formBody: post !== undefined ? post.body : '',
      formTitle: post !== undefined ? post.title : ''
    }));
  }

  handleModalClose = () => {
    this.setState(() => ({
      modalOpen: false,
      formAuthor: '',
      formBody: '',
      formTitle: '',
      isSavingForm: false
    }));
  }

  handleChange = (newState) => {
    this.setState(newState);
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    this.setState(() => ({ isSavingForm: true }))
    this.props.onModalSubmit({formAuthor: this.state.formAuthor, formBody: this.state.formBody, formTitle: this.state.formTitle});
  }

  render() {
    const {modalOpen, isSavingForm} = this.state;
    const {isEditMode, title} = this.props;

    return (
      <div className='post-form-wrapper'>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={modalOpen}
          onRequestClose={()=>this.handleModalClose()}
          contentLabel='Modal'
        >
          <div>
            {isSavingForm === true
              ? <Loading delay={200} type='spin' color='#222' className='loading' />
              : <form onSubmit={this.handleSubmitForm}>
                <h3 className='sub-header'>
                  {title}
                </h3>
                <div className='post-form'>
                  {!isEditMode
                    ?<input
                      className='post-author-input'
                      type='text'
                      placeholder='Author'
                      value={this.state.formAuthor}
                      onChange={(event)=>this.handleChange({formAuthor: event.target.value})}
                    />:''}
                  <input
                    className='post-title-input'
                    type='text'
                    placeholder='Title'
                    value={this.state.formTitle}
                    onChange={(event)=>this.handleChange({formTitle: event.target.value})}
                  />
                  <textarea
                    rows="4"
                    cols="30"
                    className='post-body-input'
                    placeholder='post here!'
                    value={this.state.formBody}
                    onChange={(event)=>this.handleChange({formBody: event.target.value})}
                  />
                  <button type="submit" disabled={false || isSavingForm}>{/*TODO: disable submit if form is empty*/}
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
export default PostModal;