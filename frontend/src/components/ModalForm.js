import React, { Component } from 'react';
import Modal from 'react-modal';
import Loading from 'react-loading';
import {connect} from 'react-redux';

class ModalForm extends Component {
  state = {
    modalOpen: false,
    isSavingForm: false,
    formBody: '',
    formAuthor: '',
    formTitle: '',
    formCategory: '',
    formPristine: true
  }

  handleModalOpen = () => {
    const {entity} = this.props;
    this.setState(() => ({
      modalOpen: true,
      formAuthor: entity !== undefined ? entity.author : '',
      formBody: entity !== undefined ? entity.body : '',
      formTitle: entity !== undefined ? entity.title : '',
      formCategory: entity !== undefined ? entity.category : ''
    }));
  }

  handleModalClose = () => {
    this.setState(() => ({
      modalOpen: false,
      formAuthor: '',
      formBody: '',
      formTitle: '',
      formCategory: '',
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
    this.props.onModalSubmit({author: this.state.formAuthor, body: this.state.formBody, title: this.state.formTitle, category: this.state.formCategory});
  }

  render() {
    const {modalOpen, isSavingForm} = this.state;
    const {isEditMode, title, showTitleField, categories} = this.props;

    return (
      <div className='modal-form-wrapper'>
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
                <div className='modal-form'>
                  {!isEditMode
                    ?<input
                      className='author-input'
                      type='text'
                      placeholder='Author'
                      value={this.state.formAuthor}
                      onChange={(event)=>this.handleChange({formAuthor: event.target.value})}
                    />:''}
                  {showTitleField
                    ?<div>
                    <input
                      className='title-input'
                      type='text'
                      placeholder='Title'
                      value={this.state.formTitle}
                      onChange={(event)=>this.handleChange({formTitle: event.target.value})}
                    />
                    <select
                    className='category-select'
                    value={this.state.formCategory && this.state.formCategory !== 'none' ? this.state.formCategory: 'none'}
                    onChange={(event)=>this.handleChange({formCategory: event.target.value})}
                    >
                    <option value="none" disabled >Select a Category...</option>
                    {categories && categories.map((cat,index) => (
                        <option key={index} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                    </div>:''}
                  <textarea
                    rows="4"
                    cols="30"
                    className='body-input'
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

function mapStateToProps ({postsReducer}) {
  return {
    categories: postsReducer.categories
  };
}

export default connect(mapStateToProps)(ModalForm);