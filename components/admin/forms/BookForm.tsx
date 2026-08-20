'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { bookSchema } from '@/lib/validation';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/FileUpload';
import { ColorPicker } from '../ColorPicker';
import { createBook } from '@/lib/admin/actions/book';
import { toast } from '@/components/ui/toast';

interface Props extends Partial<Book> {
  type?: 'create' | 'update';
}

const BookForm = ({ type, ...book }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.input<typeof bookSchema>, unknown, z.output<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      description: '',
      author: '',
      genre: '',
      rating: 1,
      totalCopies: 1,
      coverUrl: '',
      coverColor: '',
      videoUrl: '',
      summary: '',
    },
  });

  const onSubmit = async (values: z.output<typeof bookSchema>) => {
    console.log(values);
    
   const result=await createBook(values);

   if(result.success){
    toast.add({
      title:'success',
      description:"Book created successfully"
    })

    router.push(`/admin/books/${result.data.id}`)
   }else{
    toast.add({
      title:"error",
      description:result.message,
    })
   }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, (errors) => {
      console.log('VALIDATION ERRORS:', errors);
    })} className="space-y-6">
      <Field className="flex flex-col gap-1">
        <FieldLabel
          htmlFor="title"
          className="text-base font-normal text-dark-500"
        >
          Book Title
        </FieldLabel>

        <Input
          required
          placeholder="Book title"
          {...register('title')}
          className="book-form_input"
        />
      </Field>

      <Field className="flex flex-col gap-1">
        <FieldLabel
          htmlFor="title"
          className="text-base font-normal text-dark-500"
        >
          Author
        </FieldLabel>

        <Input
          required
          placeholder="Book Author"
          {...register('author')}
          className="book-form_input"
        />
      </Field>
      <Field className="flex flex-col gap-1">
        <FieldLabel
          htmlFor="title"
          className="text-base font-normal text-dark-500"
        >
          Genre
        </FieldLabel>

        <Input
          required
          placeholder="Genre"
          {...register('genre')}
          className="book-form_input"
        />
      </Field>

      <Field className="flex flex-col gap-1">
        <FieldLabel
          htmlFor="rating"
          className="text-base font-normal text-dark-500"
        >
          Rating
        </FieldLabel>

        <Input
          required
          min={1}
          max={5}
          placeholder="Book rating"
          {...register('rating')}
          className="book-form_input"
        />
      </Field>

      <Field className="flex flex-col gap-1">
        <FieldLabel
          htmlFor="totalCopies"
          className="text-base font-normal text-dark-500"
        >
          Total Copies
        </FieldLabel>

        <Input
          required
          min={1}
          max={10000}
          placeholder="Total Copies"
          {...register('totalCopies')}
          className="book-form_input"
        />
      </Field>

      <Field className="flex flex-col gap-1">
        <FieldLabel
          htmlFor="coverUrl"
          className="text-base font-normal text-dark-500"
        >
          Book Image
        </FieldLabel>

        <FileUpload
          type="image"
          placeholder="upload a book cover"
          folder="books/covers"
          variant="light"
          onFileChange={(filePath) => setValue('coverUrl', filePath)}
        />
      </Field>

      <Field className="flex flex-col gap-1">
        <FieldLabel
          htmlFor="coverColor"
          className="text-base font-normal text-dark-500"
        >
          Primary Color
        </FieldLabel>
        <ColorPicker
          value={watch('coverColor')}
          onPickerChange={(color) => setValue('coverColor', color)}
        />
      </Field>

      <Field className="flex flex-col gap-1">
        <FieldLabel
          htmlFor="description"
          className="text-base font-normal text-dark-500"
        >
          Book description
        </FieldLabel>
        <Textarea
          placeholder="book description"
          {...register('description')}
          className="book-form_input h-52"
        />
      </Field>
      <Field className="flex flex-col gap-1">
        <FieldLabel
          htmlFor="videoUrl"
          className="text-base font-normal text-dark-500"
        >
          Book Video
        </FieldLabel>

        <FileUpload
          type="video"
          placeholder="upload a book cover"
          folder="books/video"
          variant="light"
          onFileChange={(filePath) => setValue('videoUrl', filePath)}
        />
      </Field>
      <Field className="flex flex-col gap-1">
        <FieldLabel
          htmlFor="summary"
          className="text-base font-normal text-dark-500"
        >
          Book summary
        </FieldLabel>
        <Textarea
          placeholder="book description"
          {...register('summary')}
          className="book-form_input h-32"
        />
      </Field>

      <Button type="submit" className="book-form_btn text-white">
        Add Book to Library
      </Button>
      <FieldError errors={[errors.root]} />
    </form>
  );
};

export default BookForm;
