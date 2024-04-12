import { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api'
import {useNavigate, useParams} from 'react-router-dom'
import { toast } from 'react-hot-toast';



export function TasksFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const navigate = useNavigate();
  const params = useParams();

  //  Create or update
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      updateTask(params.id, data)
      toast.success('Tarea actualizada',{
        position: "bottom-right",
        style:{
          background:"#101010",
          color:"#fff"
        }
      });
      
    } else {
      await createTask(data);
      toast.success('Tarea creada',{
        position: "bottom-right",
        style:{
          background:"#101010",
          color:"#fff"
        }
      })
    }
    navigate("/tasks");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const {data} = await getTask(params.id);
        setValue('title', data.title)
        setValue('description', data.description)
      }
    }
    loadTask();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="title"
          name=""
          id=""
          {...register("title", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.title && <span>This filed is required</span>}

        <textarea
          name=""
          id=""
          cols="30"
          rows="3"
          {...register("description", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        ></textarea>
        {errors.description && <span>This filed is required</span>}
        <button
          className="bg-indigo-500 p-3 rounded-lg block w-full mt-3"
          type="submit"
        >
          Save
        </button>
      </form>

      {/* Delete */}
      {params.id && (
        <div className='flex justify-end'>
          <button
            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
            onClick={async () => {
              const accepted = window.confirm("Are you safe?");
              if (accepted) {
                await deleteTask(params.id);
                navigate("/tasks");
              }
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
