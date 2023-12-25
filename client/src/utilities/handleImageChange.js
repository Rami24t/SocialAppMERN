const handleImageChange = (e, setFiledata) => {
  setFiledata({
    url: URL.createObjectURL(e.currentTarget.files[0]),
    file: e.currentTarget.files[0],
  });
};

export { handleImageChange };
