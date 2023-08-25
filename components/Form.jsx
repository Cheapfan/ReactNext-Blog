import axios from "axios";

const Form = ({type, post, setpost, submitting, handleSubmit}) => {


  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'> {type} Post</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Title
            <input
              value={post.title}
              onChange={(e) => {setpost({ ...post, title: e.target.value})}}
              placeholder='Write your title'
              required
              className='form_input'
            >
            </input>
          </span>
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Description
            <textarea
              value={post.description}
              onChange={(e) => {setpost({ ...post, description: e.target.value})}}
              placeholder='Write your blog here...'
              required
              className='form_textarea'
            >
            </textarea>
          </span>
        </label>


        <div className='flex-end mx-3 mb-5'>
          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? '${type}...' : type}
          </button>
        </div>
        
          
      </form>
        
      
    </section>
  )
}

export default Form