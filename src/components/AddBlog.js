function AddBlog() {
  return (
    <>
      <h2>Create New Blog</h2>
      <form>
        <div>
          Title: <input type="text" name="title"></input>
        </div>
        <div>
          Author: <input type="text" name="author"></input>
        </div>
        <div>
          URL: <input type= "text" name="url"></input>
        </div>
        <button type="submit">Create blog</button>
      </form>
    </>
  )
}

export default AddBlog;