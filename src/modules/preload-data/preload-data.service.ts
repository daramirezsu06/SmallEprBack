import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { SubTypeProduct } from '../products/entities/sub_type_product.entity';
import { TypeProduct } from '../products/entities/type_product.entity';
import { Unit } from '../products/entities/unit.entity';
import { Inventory } from '../inventories/entities/inventory.entity';
import { MovementType } from '../inventories/entities/movement_Type.entity';
import * as fs from 'fs';
import * as path from 'path';
import { User } from '../user/entities/user.entity';
import { Role } from '../user/entities/role.entity';
import { Seller } from '../seller/entities/seller.entity';
import { TypeSeller } from '../seller/entities/Type_Seller.entity';
import { PriceList } from '../customer/entities/Price_List.entity';
import { PriceListItem } from '../customer/entities/Price_List_Item.entity';
import { Customer } from '../customer/entities/customer.entity';
import { TypeCustomer } from '../customer/entities/Type_Customer.entity';
const basePath = path.join(__dirname, '../../../data');

@Injectable()
export class PreloadDataService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(SubTypeProduct)
    private subTypeProductRepository: Repository<SubTypeProduct>,
    @InjectRepository(TypeProduct)
    private typeProductRepository: Repository<TypeProduct>,
    @InjectRepository(Unit) private unitRepository: Repository<Unit>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(MovementType)
    private movementTypeRepository: Repository<MovementType>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Seller) private sellerRepository: Repository<Seller>,
    @InjectRepository(TypeSeller)
    private typeSellerRepository: Repository<TypeSeller>,
    @InjectRepository(PriceList)
    private priceListRepository: Repository<PriceList>,
    @InjectRepository(PriceListItem)
    private priceListItemRepository: Repository<PriceListItem>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(TypeCustomer)
    private typeCustomerRepository: Repository<TypeCustomer>,
  ) {}

  async preloadData() {
    // Cargar los datos de TypeProduct
    // const typeProductsData = JSON.parse(
    //   fs.readFileSync(path.join(basePath, 'type_products.json'), 'utf-8'),
    // );
    // for (const typeData of typeProductsData) {
    //   const typeProduct = this.typeProductRepository.create(typeData);
    //   await this.typeProductRepository.save(typeProduct);
    // }

    // // Cargar los MovementTypes
    // const movementTypesData = JSON.parse(
    //   fs.readFileSync(path.join(basePath, 'movement_types.json'), 'utf-8'),
    // );
    // for (const movementTypeData of movementTypesData) {
    //   const movementType = this.movementTypeRepository.create(movementTypeData);
    //   await this.movementTypeRepository.save(movementType);
    // }

    // // Cargar los datos de SubTypeProduct
    // const subTypeProductsData = JSON.parse(
    //   fs.readFileSync(path.join(basePath, 'sub_type_products.json'), 'utf-8'),
    // );
    // for (const subTypeData of subTypeProductsData) {
    //   const { typeProductId, acronyms, name, description } = subTypeData;
    //   const typeProduct = await this.typeProductRepository.findOne({
    //     where: { id: typeProductId },
    //   });
    //   const subTypeProduct = this.subTypeProductRepository.create();
    //   subTypeProduct.typeProduct = typeProduct;
    //   subTypeProduct.acronyms = acronyms;
    //   subTypeProduct.name = name;
    //   subTypeProduct.description = description;
    //   await this.subTypeProductRepository.save(subTypeProduct);
    // }

    // // Cargar los datos de Unit
    // const unitsData = JSON.parse(
    //   fs.readFileSync(path.join(basePath, 'units.json'), 'utf-8'),
    // );
    // for (const unitData of unitsData) {
    //   const unit = this.unitRepository.create(unitData);
    //   await this.unitRepository.save(unit);
    // }

    // // Cargar los datos de Product
    // const productsData = JSON.parse(
    //   fs.readFileSync(path.join(basePath, 'products.json'), 'utf-8'),
    // );
    // for (const productData of productsData) {
    //   const {
    //     typeProductId,
    //     subTypeProductId,
    //     name,
    //     description,
    //     unitId,
    //     cost,
    //     quantity,
    //   } = productData;
    //   const typeProduct = await this.typeProductRepository.findOne({
    //     where: { id: typeProductId },
    //   });
    //   const subTypeProduct = await this.subTypeProductRepository.findOne({
    //     where: { id: subTypeProductId },
    //   });
    //   const unit = await this.unitRepository.findOne({
    //     where: { id: unitId },
    //   });
    //   const product = this.productRepository.create();
    //   product.typeProduct = typeProduct;
    //   product.subTypeProduct = subTypeProduct;
    //   product.name = name;
    //   product.description = description;
    //   product.unit = unit;
    //   await this.productRepository.save(product);
    //   const inventory = this.inventoryRepository.create();
    //   inventory.product = product;
    //   inventory.quantity = quantity;
    //   inventory.cost = cost;
    //   await this.inventoryRepository.save(inventory);
    // }
    // // Cargar los datos de roles
    // const rolesData = JSON.parse(
    //   fs.readFileSync(path.join(basePath, 'roles.json'), 'utf-8'),
    // );
    // for (const roleData of rolesData) {
    //   const role = this.roleRepository.create(roleData);
    //   await this.roleRepository.save(role);
    // }

    // // Cargar los datos de usuarios
    // const usersData = JSON.parse(
    //   fs.readFileSync(path.join(basePath, 'users.json'), 'utf-8'),
    // );
    // for (const userData of usersData) {
    //   const { roleId, name, email, password } = userData;
    //   const user = this.userRepository.create();
    //   user.name = name;
    //   user.email = email;
    //   user.password = password;
    //   const role = await this.roleRepository.findOne({ where: { id: roleId } });
    //   user.role = role;
    //   await this.userRepository.save(user);
    // }

    // // Cargar los TypeSeller
    // const typeSellersData = JSON.parse(
    //   fs.readFileSync(path.join(basePath, 'type_sellers.json'), 'utf-8'),
    // );
    // for (const typeSellerData of typeSellersData) {
    //   const typeSeller = this.typeSellerRepository.create(typeSellerData);
    //   await this.typeSellerRepository.save(typeSeller);
    // }

    // // Cargar los Sellers
    // const sellersData = JSON.parse(
    //   fs.readFileSync(path.join(basePath, 'sellers.json'), 'utf-8'),
    // );
    // for (const sellerData of sellersData) {
    //   const { typeSellerId, name, lastName, cedula, userId } = sellerData;
    //   const typeSeller = await this.typeSellerRepository.findOne({
    //     where: { id: typeSellerId },
    //   });
    //   const user = await this.userRepository.findOne({
    //     where: { id: userId },
    //   });
    //   const seller = this.sellerRepository.create();
    //   seller.typeSeller = typeSeller;
    //   seller.name = name;
    //   seller.lastName = lastName;
    //   seller.cedula = cedula;
    //   seller.user = user;
    //   await this.sellerRepository.save(seller);
    // }
    // Cargar los precios
    // const priceListsData = JSON.parse(
    //   fs.readFileSync(path.join(basePath, 'price_lists.json'), 'utf-8'),
    // );
    // for (const priceListData of priceListsData) {
    //   const { name, description, items } = priceListData;
    //   const priceList = this.priceListRepository.create();
    //   priceList.name = name;
    //   priceList.description = description;
    //   await this.priceListRepository.save(priceList);
    //   for (const item of items) {
    //     const priceListItem = this.priceListItemRepository.create();
    //     priceListItem.price = item.price;
    //     priceListItem.product = await this.productRepository.findOne({
    //       where: { id: item.productId },
    //     });
    //     priceListItem.priceList = priceList;
    //     await this.priceListItemRepository.save(priceListItem);
    //   }
    //   await this.priceListRepository.save(priceList);
    // }

    // Cargar los tipos de clientes
    const typeCustomersData = JSON.parse(
      fs.readFileSync(path.join(basePath, 'type_customer.json'), 'utf-8'),
    );
    for (const typeCustomerData of typeCustomersData) {
      const { name, description } = typeCustomerData;
      const typeCustomer = this.typeCustomerRepository.create();
      typeCustomer.name = name;
      typeCustomer.description = description;
      await this.typeCustomerRepository.save(typeCustomer);
    }

    // Cargar los clientes
    const customersData = JSON.parse(
      fs.readFileSync(path.join(basePath, 'customer.json'), 'utf-8'),
    );
    for (const customerData of customersData) {
      const {
        name,
        address,
        lat,
        lon,
        nit,
        tel,
        customerTypeId,
        sellerId,
        priceListId,
      } = customerData;
      const typeCustomer = await this.typeCustomerRepository.findOne({
        where: { id: customerTypeId },
      });
      const seller = await this.sellerRepository.findOne({
        where: { id: sellerId },
      });
      const priceList = await this.priceListRepository.findOne({
        where: { id: priceListId },
      });
      const customer = this.customerRepository.create();
      customer.typeCustomer = typeCustomer;
      customer.name = name;
      customer.address = address;
      customer.lat = lat;
      customer.lon = lon;
      customer.nit = nit;
      customer.tel = tel;
      customer.typeCustomer = typeCustomer;
      customer.seller = seller;
      customer.priceList = priceList;
      await this.customerRepository.save(customer);
    }

    console.log('Datos precargados correctamente');
  }
}
