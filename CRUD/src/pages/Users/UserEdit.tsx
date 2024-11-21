import BasePageLayout from '../../components/BasePageLayout';
import FormUser from '../../components/FormUser';


const UserEdit = () => {
  return (
    <BasePageLayout pageTitle='Editar Cliente' labelTitle='Editar Cliente'>
      <FormUser />
    </BasePageLayout>
  );
};
export default UserEdit;