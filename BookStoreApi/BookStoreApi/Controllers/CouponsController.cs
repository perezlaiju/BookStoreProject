﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using BookStoreApi.Models;

namespace BookStoreApi.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using BookStoreApi.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Coupon>("Coupons");
    builder.EntitySet<OrderCoupon>("OrderCoupons"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class CouponsController : ODataController
    {
        private BookStoreDBEntities db = new BookStoreDBEntities();

        // GET: odata/Coupons
        [EnableQuery]
        public IQueryable<Coupon> GetCoupons()
        {
            return db.Coupons;
        }

        // GET: odata/Coupons(5)
        [EnableQuery]
        public SingleResult<Coupon> GetCoupon([FromODataUri] int key)
        {
            return SingleResult.Create(db.Coupons.Where(coupon => coupon.Id == key));
        }

        // PUT: odata/Coupons(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Coupon> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Coupon coupon = db.Coupons.Find(key);
            if (coupon == null)
            {
                return NotFound();
            }

            patch.Put(coupon);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CouponExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(coupon);
        }

        // POST: odata/Coupons
        public IHttpActionResult Post(Coupon coupon)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Coupons.Add(coupon);
            db.SaveChanges();

            return Created(coupon);
        }

        // PATCH: odata/Coupons(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Coupon> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Coupon coupon = db.Coupons.Find(key);
            if (coupon == null)
            {
                return NotFound();
            }

            patch.Patch(coupon);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CouponExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(coupon);
        }

        // DELETE: odata/Coupons(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Coupon coupon = db.Coupons.Find(key);
            if (coupon == null)
            {
                return NotFound();
            }

            db.Coupons.Remove(coupon);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Coupons(5)/OrderCoupons
        [EnableQuery]
        public IQueryable<OrderCoupon> GetOrderCoupons([FromODataUri] int key)
        {
            return db.Coupons.Where(m => m.Id == key).SelectMany(m => m.OrderCoupons);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CouponExists(int key)
        {
            return db.Coupons.Count(e => e.Id == key) > 0;
        }
    }
}
