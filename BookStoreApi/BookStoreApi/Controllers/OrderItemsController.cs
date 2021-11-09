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
    builder.EntitySet<OrderItem>("OrderItems");
    builder.EntitySet<Book>("Books"); 
    builder.EntitySet<Order>("Orders"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class OrderItemsController : ODataController
    {
        private BookStoreDBEntities db = new BookStoreDBEntities();

        // GET: odata/OrderItems
        [EnableQuery]
        public IQueryable<OrderItem> GetOrderItems()
        {
            return db.OrderItems;
        }

        // GET: odata/OrderItems(5)
        [EnableQuery]
        public SingleResult<OrderItem> GetOrderItem([FromODataUri] int key)
        {
            return SingleResult.Create(db.OrderItems.Where(orderItem => orderItem.Id == key));
        }

        // PUT: odata/OrderItems(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<OrderItem> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            OrderItem orderItem = db.OrderItems.Find(key);
            if (orderItem == null)
            {
                return NotFound();
            }

            patch.Put(orderItem);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderItemExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(orderItem);
        }

        // POST: odata/OrderItems
        public IHttpActionResult Post(OrderItem orderItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OrderItems.Add(orderItem);
            db.SaveChanges();

            return Created(orderItem);
        }

        // PATCH: odata/OrderItems(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<OrderItem> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            OrderItem orderItem = db.OrderItems.Find(key);
            if (orderItem == null)
            {
                return NotFound();
            }

            patch.Patch(orderItem);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderItemExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(orderItem);
        }

        // DELETE: odata/OrderItems(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            OrderItem orderItem = db.OrderItems.Find(key);
            if (orderItem == null)
            {
                return NotFound();
            }

            db.OrderItems.Remove(orderItem);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/OrderItems(5)/Book
        [EnableQuery]
        public SingleResult<Book> GetBook([FromODataUri] int key)
        {
            return SingleResult.Create(db.OrderItems.Where(m => m.Id == key).Select(m => m.Book));
        }

        // GET: odata/OrderItems(5)/Order
        [EnableQuery]
        public SingleResult<Order> GetOrder([FromODataUri] int key)
        {
            return SingleResult.Create(db.OrderItems.Where(m => m.Id == key).Select(m => m.Order));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderItemExists(int key)
        {
            return db.OrderItems.Count(e => e.Id == key) > 0;
        }
    }
}
