import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { STATUS_CODES } from 'http';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomersService){} 

    @Get(':id')
    getCustomer(@Req() req:Request, @Res() res:Response){
      const id = Number(req.params.id)
      const customer =  this.customerService.findCustomer(id);
      if(customer){
        res.send(customer);
      }else{
        res.status(400).send({msg:'Customer not found'});
      }
    }

    @Get('/search/:id')
    getCustomer1(@Param('id', ParseIntPipe) id: number){
      console.log(typeof id); 
      const customer =  this.customerService.findCustomer(id);
      if(customer) return customer;
      else throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
    }
}
