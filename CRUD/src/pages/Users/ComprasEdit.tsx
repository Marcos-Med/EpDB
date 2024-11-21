import EditingCompra from "../../components/EditingCompra";
import BasePageEditCompras from "../../components/BasePageEditCompras";
import { useParams } from "react-router-dom";

const CompraEdit = () => {
  const { id, code } = useParams();
  let user_id: any;
  let cd:any;
  if (id && code){
    user_id = parseInt(id);
    cd = code;
  }
    return (
        <BasePageEditCompras pageTitle="Editar Compra">
            <EditingCompra code_product={cd} user_Id={user_id} />
        </BasePageEditCompras>
    )
}

export default CompraEdit;