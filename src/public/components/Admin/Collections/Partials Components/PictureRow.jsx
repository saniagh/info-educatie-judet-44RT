import React, {Component} from 'react';
import {CardMedia, CardTitle} from 'material-ui';
import Lightbox from 'react-image-lightbox';

class PictureRow extends Component {

    constructor(props){
        super(props);

        this.state = {
            modalIsOpen: false
        }
    }

    handleOpenModal = () => {
        this.setState({
            modalIsOpen: true
        })
    };

    handleCloseModal = () => {
        this.setState({
            modalIsOpen: false
        })
    };

    getHTML = () => {
        if (this.props.pictureDescription) {
            return {__html: this.props.pictureDescription};
        }
    };

    addDefaultPicture = (e) => {
        e.target.src = "http://hdimages.org/wp-content/uploads/2017/03/placeholder-image4.jpg"
    };

    render() {
        return (
            <div className="force-image-height">
                <CardMedia
                    style={{cursor: "pointer"}}
                    onTouchTap={this.handleOpenModal}
                    overlay={<CardTitle title={this.props.pictureName}/>}
                >
                    <img onError={this.addDefaultPicture} src={this.props.pictureLink}/>
                </CardMedia>
                {this.state.modalIsOpen &&
                <Lightbox mainSrc={this.props.pictureLink}
                          onCloseRequest={this.handleCloseModal}
                          imageTitle={this.props.pictureName}
                          imageCaption={<div dangerouslySetInnerHTML={this.getHTML()}
                                             style={{wordWrap: "break-word", wordBreak: 'break-word', overflowWrap: 'break-word'}}/>}
                          reactModalStyle={{
                              overlay: {zIndex: 9999},
                              content: {zIndex: 9999}
                          }}
                />
                }
            </div>
        )
    }
}
export default PictureRow;