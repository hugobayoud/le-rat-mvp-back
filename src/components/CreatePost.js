import React from 'react';

function CreatePost() {
  return (
    <div className="new-post-modal">
      <form>
        <textarea placeholder="message ..."></textarea>
        <input type="submit" value="Publish" />
      </form>
    </div>
  );
}

export default CreatePost;
