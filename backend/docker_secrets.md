```bash
# Database username
echo "postgres" | docker secret create db_user -

# Database password 
echo "postgres" | docker secret create db_password -

# Database name
echo "angkorlance" | docker secret create db_name -

```