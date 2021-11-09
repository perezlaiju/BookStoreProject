using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
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
    builder.EntitySet<OrderCoupon>("OrderCoupons");
    builder.EntitySet<Coupon>("Coupons"); 
    builder.EntitySet<Order>("Orders"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class OrderCouponsController : ODataController
    {
        private BookStoreDBEntities db = new BookStoreDBEntities();

        // GET: odata/OrderCoupons
        [EnableQuery]
        public IQueryable<OrderCoupon> GetOrderCoupons()
        {
            return db.OrderCoupons;
        }

        // GET: odata/OrderCoupons(5)
        [EnableQuery]
        public SingleResult<OrderCoupon> GetOrderCoupon([FromODataUri] int key)
        {
            return SingleResult.Create(db.OrderCoupons.Where(orderCoupon => orderCoupon.Id == key));
        }

        // PUT: odata/OrderCoupons(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<OrderCoupon> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            OrderCoupon orderCoupon = db.OrderCoupons.Find(key);
            if (orderCoupon == null)
            {
                return NotFound();
            }

            patch.Put(orderCoupon);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderCouponExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(orderCoupon);
        }

        // POST: odata/OrderCoupons
        public IHttpActionResult Post(OrderCoupon orderCoupon)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OrderCoupons.Add(orderCoupon);
            db.SaveChanges();

            return Created(orderCoupon);
        }

        // PATCH: odata/OrderCoupons(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<OrderCoupon> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            OrderCoupon orderCoupon = db.OrderCoupons.Find(key);
            if (orderCoupon == null)
            {
                return NotFound();
            }

            patch.Patch(orderCoupon);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderCouponExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(orderCoupon);
        }

        // DELETE: odata/OrderCoupons(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            OrderCoupon orderCoupon = db.OrderCoupons.Find(key);
            if (orderCoupon == null)
            {
                return NotFound();
            }

            db.OrderCoupons.Remove(orderCoupon);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/OrderCoupons(5)/Coupon
        [EnableQuery]
        public SingleResult<Coupon> GetCoupon([FromODataUri] int key)
        {
            return SingleResult.Create(db.OrderCoupons.Where(m => m.Id == key).Select(m => m.Coupon));
        }

        // GET: odata/OrderCoupons(5)/Order
        [EnableQuery]
        public SingleResult<Order> GetOrder([FromODataUri] int key)
        {
            return SingleResult.Create(db.OrderCoupons.Where(m => m.Id == key).Select(m => m.Order));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderCouponExists(int key)
        {
            return db.OrderCoupons.Count(e => e.Id == key) > 0;
        }
    }
}
