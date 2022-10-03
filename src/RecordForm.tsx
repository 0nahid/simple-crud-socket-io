import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

export default function RecordForm() {

  const [multipleFiles, setMultipleFiles] = useState<String>('');

  const MultipleFileChange = (e: any) => {
    setMultipleFiles(e.target.files);
  }

  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;

    const url = 'http://localhost:5000/api/v1/users/upload';
    setLoading(true);
    const formData = new FormData();
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append('image', multipleFiles[i]);
    }
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          const body = {
            name: name,
            email: email,
          };
          fetch(
            `http://localhost:5000/api/v1/users`,
            {
              method: "POST",
              headers: {
                "content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          )
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              if (result?.success) {

                setLoading(false);
              }
            });
          toast.success("User Saved Successfully");
        }
      });
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="input input-bordered w-full"
          required
        />
        <label>Upload Image</label>
        <input type="file" name="image" onChange={(e) => MultipleFileChange(e)} multiple />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}