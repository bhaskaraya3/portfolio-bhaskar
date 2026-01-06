-- DATA HEALTH CHECK
-- TOTAL RECORDS
SELECT 
COUNT(*) AS total_orders
FROM superstore;
-- DATE RANGE
SELECT
MIN(order_date) AS first_date,
MAX(order_date) AS last_date
FROM superstore;
-- DUPLICATE ORDERS
SELECT
order_id,
COUNT(*)
FROM superstore
GROUP BY order_id
HAVING COUNT(*)>1;
-- I validated data consistency before analysis.

-- REVENUE & SALES PERFORMANCE
-- TOTAL REVENUE GENERATED
SELECT
ROUND(SUM(sales),2) AS total_revenue
FROM superstore;
-- YEAR WISE REVENUE GENERATED
SELECT
YEAR(order_date) AS year,
ROUND(SUM(sales),2) AS total_revenue
FROM superstore
GROUP BY YEAR(order_date)
ORDER BY year DESC;
-- REVENUE BY MONTH(SHOWS TREND)
SELECT
YEAR(order_date) AS year,
MONTH(order_date) AS month,
ROUND(SUM(sales),2) AS total_revenue
FROM superstore
GROUP BY YEAR(order_date),MONTH(order_date)
ORDER BY year DESC;
-- Business POV: seasonality & growth trends.

-- CATEGORY & PRODUCT PORTFOLIO ANALYSIS
-- category wise revenue generated
SELECT 
category,
ROUND(SUM(sales),2) AS total_revenue
FROM superstore
GROUP BY category
ORDER BY ROUND(SUM(sales),2) DESC
;
-- revenue generated sub_category wise
SELECT 
sub_category,
ROUND(SUM(sales),2) AS total_revenue
FROM superstore
GROUP BY sub_category
ORDER BY ROUND(SUM(sales),2) DESC
;
-- TOP 10 PRODUCTS BY REVENUE
SELECT 
product_id,
sub_category,
ROUND(SUM(sales),2) AS total_revenue
FROM superstore
GROUP BY product_id,sub_category
ORDER BY ROUND(SUM(sales),2) DESC
LIMIT 10;
-- Identified high-performing and long-tail products.

-- CUSTOMER & SEGMENT BEHAVIOR
-- CUSTOMER PER SEGMENT
SELECT
segment,
COUNT(DISTINCT customer_id) AS count
FROM superstore
GROUP BY segment;
-- revenue generated segment wise
SELECT 
segment,
ROUND(SUM(sales),2) AS total_revenue
FROM superstore
GROUP BY segment
ORDER BY ROUND(SUM(sales),2) DESC
;
-- AVG ORDER VALUE SEGMENT WISE
SELECT
segment,
-- ROUND(AVG(sales),2) AS avg_order_value
 ROUND(SUM(sales)/COUNT(DISTINCT order_id),2) AS avg_order_value
FROM superstore
GROUP BY segment
ORDER BY avg_order_value DESC;
-- Business insight: which segment brings quality revenue, not just volume.

-- GEOGRAPHY & MARKET PERFORMANCE
-- REVENUE BY region
SELECT
region,
ROUND(SUM(sales),2) AS revenue
FROM superstore
GROUP BY region
ORDER BY revenue DESC
;
-- TOP 10 state
SELECT
state,
ROUND(SUM(sales),2) AS revenue
FROM superstore
GROUP BY state
ORDER BY revenue DESC
LIMIT 10
;
-- City-level dominance
SELECT 
city,
ROUND(SUM(sales),2) AS revenue
FROM superstore
GROUP BY city
ORDER BY revenue DESC
LIMIT 10;
-- Interview POV: expansion & regional strategy.

-- OPERATIONAL & DELIVERY ANALYSIS
-- Average delivery time
SELECT 
ROUND(AVG(delievery_days),2) AS avg_delivery_days
FROM superstore;

-- Delivery days by ship mode
SELECT 
ship_mode,
ROUND(AVG(delievery_days),2) AS avg_delivery_days
FROM superstore
GROUP BY ship_mode
ORDER BY avg_delivery_days DESC;
-- Revenue vs delivery speed
SELECT 
ship_mode,
ROUND(SUM(sales),2) AS revenue,
ROUND(AVG(delievery_days),2) AS avg_delivery_days
FROM superstore
GROUP BY ship_mode
ORDER BY avg_delivery_days DESC;
-- Business question:Does faster delivery actually generate more revenue?


-- ADVANCED BUSINESS QUESTIONS
-- High-revenue but slow-delivery orders
SELECT
order_id,
sales,
delievery_days
FROM superstore
WHERE delievery_days>(
SELECT AVG(delievery_days)
FROM superstore)
ORDER BY sales DESC
LIMIT 10;
-- Category performance by region
SELECT
region,
category,
ROUND(SUM(sales),2) AS revenue
FROM superstore
GROUP BY region,category
ORDER BY revenue DESC;

-- Customer concentration risk (top 10 customers revenue share)
SELECT * FROM superstore;
SELECT
customer_name,
ROUND(SUM(sales),2) AS revenue
FROM superstore
GROUP BY customer_name
ORDER BY revenue DESC
LIMIT 10;
-- Insight: dependency risk on few customers.


-- CATEGORY MOST SOLD,REVENUE
SELECT 
category,
COUNT(*) AS order_lines,
ROUND(SUM(sales), 2) AS revenue
FROM superstore
GROUP BY category
ORDER BY revenue DESC;

-- SEGMENT WISE ITEMS SOLD
SELECT 
segment,
COUNT(DISTINCT order_id) AS orders,
ROUND(SUM(sales),2) AS revenue,
ROUND(SUM(sales)/COUNT(DISTINCT order_id),2) AS avg_order_value
FROM superstore
GROUP BY segment
ORDER BY revenue DESC;

-- SEGMENT × CATEGORY COUNT
SELECT 
segment,
category,
COUNT(*) AS order_lines,
ROUND(SUM(sales),2) AS revenue
FROM superstore
GROUP BY segment, category
ORDER BY revenue DESC;

-- SHIP MODE
SELECT
ship_mode,
COUNT(*) AS orders,
ROUND(AVG(delievery_days),2) AS avg_delivery_days,
ROUND(SUM(sales),2) AS revenue
FROM superstore
GROUP BY ship_mode
ORDER BY revenue DESC;


