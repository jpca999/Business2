import React, {Component} from 'react'
import { listRecords } from '../graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'
import { onCreateRecord, onUpdateRecord, onDeletePost } from '../graphql/subscriptions'
import DeletePost from './DeletePost'
import EditPost from './EditPost'
import CommentPost from './CommentPost'
// import CreateCommentPost from './CreateCommentPost'


export default class DisplayPosts extends Component{

    state = {
        posts: []
    }

    getPosts = async () => {
        const result = await API.graphql (graphqlOperation(listRecords))
      
        this.setState ({ posts: result.data.listRecords.items})
    };


    componentDidMount = async() =>{
        this.getPosts()

    this.createPostListener = API.graphql(graphqlOperation(onCreateRecord))
    .subscribe({
        next: postData => {
             const newPost = postData.value.data.onCreateRecord
             const prevPosts = this.state.posts.filter( post => post.id !== newPost.id)

             const updatedPosts = [newPost, ...prevPosts]

             this.setState({ posts: updatedPosts})
        }
    })

    this.deletePostListener = API.graphql(graphqlOperation(onUpdateRecord))
       .subscribe({
            next: postData => {
                  
               const deletedPost = postData.value.data.onUpdateRecord
               const updatedPosts = this.state.posts.filter(post => post.id !== deletedPost.id)
               this.setState({posts: updatedPosts})
            }
       })

       this.updatePostListener = API.graphql(graphqlOperation(onUpdateRecord))
       .subscribe({
            next: postData => {
                 const { posts } = this.state
                 const updatePost = postData.value.data.onUpdateRecord
                 const index = posts.findIndex(post => post.id === updatePost.id) //had forgotten to say updatePost.id!
                 const updatePosts = [
                     ...posts.slice(0, index),
                    updatePost,
                    ...posts.slice(index + 1)
                   ]

                   this.setState({ posts: updatePosts})

            }
       })
}

       componentWillUnmount() {
        this.createPostListener.unsubscribe()
        this.deletePostListener.unsubscribe()
        this.updatePostListener.unsubscribe()
        // this.createPostCommentListener.unsubscribe()
        // this.createPostLikeListener.unsubscribe()
    }

 
    render(){
        const { posts } = this.state; 
        return posts.map((post)  =>{
            return (
                <div className="posts" style={rowStyle} key={post.id}> 
                    <h1 > {post.companyName} </h1>
                    <span style={{ fontStyle: "italic", color: "#0ca5e297"  }}> 
                         wrote by:  {post.postOwnerUsername}
                         <time style={{ fontStyle: "italic" }}> on: { new Date(post.createdAt).toDateString()  }  </time>
                    </span>
                    <p> {post.postBody} </p>


                <span>
                <DeletePost data={post}/> <EditPost {...post} />   
                </span>

                <span>
                        

                    </span>
                    
                </div>
            )
        })

    }

};

const rowStyle = {
    background: '#f4f4f4', 
    padding: '10px',
    border: '1px #ccc dotted',
    margin: '14px', 
}