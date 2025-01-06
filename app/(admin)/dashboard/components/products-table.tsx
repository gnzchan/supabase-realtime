import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Tables } from "@/database.types";

type Product = Tables<"products">;

export const ProductsTable = ({ products }: { products: Product[] }) => {
  return (
    <Table>
      <TableCaption>A list of your available products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Product</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow>
            <TableCell className="font-medium">{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell className="text-right">${product.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
