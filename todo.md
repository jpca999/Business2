=========================================
 <CreateCommentPost postId={post.id} /> in display posts page 
===========================
> sudo npx 
> sudo yarn add aws-amplify aws-amplify-react


( to get started )
amplify init 

amplify add api 
(  added schema )

>amplify push  ( do - after schma is there )

( after chaning the schema when we push, it will update the api 
code based on the schmea changes)

> amplify console api  ( this will open the api in browser )

https://us-west-2.console.aws.amazon.com/appsync/home?region=us-west-2#/f5d4hqbwjjgvnafq52udhwgwiq/v1/schema


( go on UI and add posts and comments etc in the table)

> sudo yarn add aws-amplify aws-amplify-react

>  then make the changes aws-configure at the home file index.js. 

>amplify publish 


====================================
Convert edit fild of 3000 into a navigation and then 
make the 1900 into 3000

---- comments = multiple labels ---- 
Then filter the posts based on comments/labels ( high priority/ low priority ). 


OwnerStatus field has to be changed to multiple Options like an array it can have multiple options. 












mutation addRecord {
  
  createRecord(input:{
    companyName:"second company"
  })
  {
    companyName
  }
}		




query MyQuery {
  listRecords {
    nextToken
    items {
      id
      companyName
    }
  }
}

