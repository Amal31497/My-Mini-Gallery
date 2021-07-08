import React, { useRef, useEffect, useState } from 'react';
import { useArtContext } from "../../utils/GlobalState";
import { FiSend } from 'react-icons/fi';
import { addComment, updateArt, loadComments, getOneArt, getArtist } from '../../utils/API';
import placeholder from '../assets/artist.jpg';
import { Spinner } from 'react-bootstrap';
import Moment from 'react-moment';
import 'moment-timezone';


const CommentSection = () => {
    const [_, dispatch] = useArtContext();
    const commentRef = useRef();
    const artId = window.location.search.split("?")[1];
    const [artist, setArtist] = useState();
    const [comments, setComments] = useState();


    useEffect(() => {
        getArtist(_.user)
            .then(response => {
                // console.log(response.data)
                setArtist({
                    username:response.data.username,
                    avatar: response.data.avatar,
                    description: response.data.description,
                    firstName: response.data.firstName
                })
            })
            .catch(error => console.log(error))
    },[_.user])


    const handleCommentSubmit = (event) => {
        event.preventDefault();          
        const comment = {
            content: commentRef.current.value,
            userInfo: artist,
            date: Date.now(),
            user: _.user
        }
        // console.log(comment)
        if(artId){
            addComment(comment)
                .then(response => {
                    updateArt(artId,{_id:response.data._id})
                        .then(response => {
                            // console.log(response)
                            commentRef.current.value = null;
                            showComments();
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        }
    }

    const showComments = () => {
        getOneArt(artId)
            .then(response => {
                // console.log(response.data)
                // setComments(response.data.comments)
                var targetedComments = response.data.comments;
                loadComments()
                    .then(response => {
                        var artComments = [];
                        response.data.map(comment => {
                            if(targetedComments.includes(comment._id)) return artComments.push(comment);
                        })
                        setComments(artComments)
                    })
            })
    }
    useEffect(() => {
        showComments();
    },[])

    // console.log(comments)

    return(
        <>

            { _.user ? 
                <div className="addOrJoin col-12">
                    <div className="row" style={{ width: "100%" }}>
                        <div className="col-12">
                            <h5>Add Comment</h5>
                            <textarea className="addComment" rows={1} ref={commentRef} />
                            <FiSend size={30} style={{ marginBottom: "25px", marginLeft: "5px" }} onClick={handleCommentSubmit} />
                        </div>
                    </div>
                </div>
                :
                <div className="addOrJoin col-12">
                    <h5 className="col-12">Join My-Mini-Gallery to add your comment or
                        <span>
                            <a href="/login">
                                LogIn
                            </a>
                        </span>
                    </h5>
                </div>
            }
            <div className="col-12">
                {comments && comments.length > 0 ?
                    comments.map(comment => {
                        return (
                            <>
                                <div className="row">
                                    <div className="col-1">
                                        {comment ? 
                                            <img className="commentArtistThumbnail"src={comment.userInfo.avatar.avatarSrc}  alt={comment.userInfo.username}/>
                                            :
                                            <img src={placeholder} alt="artist" />
                                        }
                                    </div>
                                    <div className="commentWrapper col-11">
                                        {comment? 
                                            <div className="mainComment">
                                                <h6 >
                                                    {comment.userInfo.username}
                                                &nbsp;
                                                posted
                                                &nbsp;
                                                <strong><i><Moment fromNow>{comment.date}</Moment></i></strong>
                                                </h6>
                                                &nbsp;<p>-&nbsp;{comment.content}</p>
                                            </div>
                                            :
                                            <Spinner animation="grow" variant="dark" />
                                        }
                                        <br />
                                    </div> 
                                </div>
                                
                            </>
                        )
                    })
                    :
                    <h3>No comments added yet.</h3>
                }
            </div>
            




            {/* {_.user ?
                <div className="addOrJoin">
                    <h5>Add Comment</h5>
                    <div className="col-12">
                        <textarea className="addComment" ref={commentRef}/>
                        <FiSend size={40} onClick={handleCommentSubmit}/>
                    </div>
                </div>
                :
                <div className="addOrJoin">
                    <h5 className="col-12">Join My-Mini-Gallery to add your comment or
                        <span>
                            <a href="/login">
                                LogIn
                            </a>
                        </span>
                    </h5>
                </div>
            }
            {(comments&&comments.length>0)?
                comments.map(comment => {
                    return(
                        <>
                            <div className="commentWrapper">
                                <h4>{comment.userInfo.username}</h4>
                                <p>{comment.content}</p>
                            </div>
                        </>
                    )
                })
                :
                <h5>No comments posted yet :(</h5>
            } */}
        </>
    )
}

export default CommentSection;