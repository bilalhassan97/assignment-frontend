import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SaveIcon from "@mui/icons-material/Save";

import { Button, Input, Loader } from "@components";
import {
  createCollection,
  getCollectionById,
  updateCollection,
} from "@store/collection/CollectionActions";
import { useEffect } from "react";

interface CollectionDetailModalProps {
  onClose: any;
  onSave: any;
  open: boolean;
  id: string | undefined;
}

const defaultValues = {
  title: "",
};

const CollectionDetailModal: React.FC<CollectionDetailModalProps> = (props) => {
  const { onClose, onSave, open, id } = props;
  const handleClose = () => {
    onClose();
  };
  const dispatch = useDispatch();

  const { loading }: any = useSelector<any>(
    ({ restaurantHub }) => restaurantHub.app
  );

  const { collection }: any = useSelector<any>(
    ({ restaurantHub }) => restaurantHub.collection
  );

  const schema = yup.object().shape({
    title: yup.string().required("Title is required!"),
  });
  const methods = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { control, handleSubmit, formState, reset } = methods;
  const { isValid, errors } = formState;

  useEffect(() => {
    if (id) dispatch(getCollectionById({ id }));
  }, [id, dispatch]);

  useEffect(() => {
    if (!collection || !id) {
      return;
    }
    /**
     * Reset the form on data changes
     */
    reset(collection);
  }, [id, collection, reset]);

  function onSubmit(data: any) {
    const form = {
      title: data.title,
    };
    reset(defaultValues);
    onSave();
    if (id) return dispatch(updateCollection({ id, form }));
    dispatch(createCollection({ form }));
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Loader loading={loading} />
      <div className="flex flex-col px-10 py-10 items-center">
        <p className="text-xl font-bold">Collection Detail</p>
        <form
          className="flex flex-col space-y-8 py-4 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            name="title"
            control={control}
            label={"Collection Title"}
            error={!!errors.title}
            errorMessage={errors?.title?.message}
            fullWidth
          />
          <Button
            color="secondary"
            className="w-full mx-auto mt-16"
            type="submit"
            disabled={!isValid}
          >
            <SaveIcon /> Save
          </Button>
        </form>
      </div>
    </Dialog>
  );
};

export default CollectionDetailModal;
