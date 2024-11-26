import FormUser from '../../components/FormUser';
import BasePageLayout from '../../components/BasePageLayout';

const UserCreate = () => {
  return (
    <BasePageLayout pageTitle='Criar Cliente' labelTitle='Criar Cliente'>
      <FormUser />
    </BasePageLayout>
  );
};
export default UserCreate; //Retorna página de criar usuário