import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom"
import "../../styles/create-form.css"
interface CreateFormData {
  title: string;
  description: string;
}
export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("You must add a TITLE."),
    description: yup.string().required("You must add a DESCRIPTION."),
  });

  const { register, handleSubmit, formState: { errors }, } = useForm<CreateFormData>({
    resolver: yupResolver(schema)
  })

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    })
    navigate("/");
  }
  return (
    <form className="create-form" onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder="Title..." {...register("title")} />
      <p>{errors.title?.message}</p>
      <textarea placeholder="Description..." {...register("description")} />
      <p>{errors.description?.message}</p>
      <input type="submit" className="submit-form" />
    </form>

  )
}