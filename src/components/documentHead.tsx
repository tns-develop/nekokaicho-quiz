import React from "react";

const DocumentHead = ({ title = '', description = '' }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta
        name="description"
        content={description ? description : 'default description...'}
      />
      <link rel="icon" href="/favicon.png" />
    </>
  )
}

export default DocumentHead;