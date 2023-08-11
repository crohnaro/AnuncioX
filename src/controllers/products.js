import cloudinary from 'cloudinary'
import formidable from "formidable-serverless";
import ProductsModel from "../models/products";
import dbConnect from "../utils/dbConnect";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.API_SECRET_CLOUDINARY,
  })

const post = async (req, res) => {
  await dbConnect();

  const form = new formidable.IncomingForm({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async (error, fields, data) => {
    if (error) {
      return res.status(500).json({ success: false });
    }
    const { files } = data;

    // transform files in an array
    const filesArray = files instanceof Array ? files : [files];

    let uploadedImg = [];
    const filesWrapper = [];
    const filesToSave = [];

    for (let i = 0; i < filesArray.length; i++) {
      uploadedImg = await cloudinary.v2.uploader.unsigned_upload(
        filesArray[i].path,
        "my-uploads",
        {
          resource_type: "image",
          access_type: "anonymous",
        },
        (error) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ success: false });
          }
        }
      );

      filesWrapper.push(uploadedImg);

      const newFilename = filesWrapper[i].original_filename;
      const newUrl = filesWrapper[i].secure_url;
      const publicId = filesWrapper[i].public_id;

      filesToSave.push({
        name: newFilename,
        url: newUrl,
        publicId,
      });
    }

    const {
      title,
      category,
      description,
      price,
      userId,
      image,
      name,
      email,
      phone,
    } = fields;

    const product = new ProductsModel({
      title,
      category,
      description,
      price,
      user: {
        id: userId,
        image,
        name,
        email,
        phone,
      },
      files: filesToSave,
    });

    const register = await product.save();

    if (register) {
      res.status(201).json({ success: true });
    } else {
      res.status(500).json({ success: false });
    }
  });
};

const remove = async (req, res) => {
  await dbConnect();

  const id = req.body.id;
  const files = req.body.files;

  for (let i = 0; i < files.length; i++) {
    cloudinary.v2.uploader.destroy(files[i].publicId);
  }
  const deleted = await ProductsModel.findOneAndRemove({ id: id });

  if (deleted) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(500).json({ success: false });
  }
};

export { post, remove };
